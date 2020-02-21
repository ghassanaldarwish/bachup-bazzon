import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDTO } from './Product.dto';
import  uuid from 'uuid/v4';
import * as fs from 'fs';
import * as Path from 'path';
import * as util from 'util';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
const readFile = util.promisify(fs.readFile);
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('product')
    private readonly productModel: Model<any>,
    @InjectModel('product_review')
    private readonly productReviewModel: Model<any>,
    @InjectModel('product_media')
    private readonly productMediaModel: Model<any>,
  ) {}

  deleteFolderRecursive(path:any) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file, index) => {
        const curPath = Path.join(path, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          // recurse
          this.deleteFolderRecursive(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }

  async findByIdAndDelete(id:any) {
    const product = await this.findOneById(id);
    const productReview = await this.productReviewModel.findById(
      product.productReview,
    );
    await this.productReviewModel
      .deleteOne({ _id: product.productReview })
      .exec();
    this.deleteFolderRecursive(`uploads/temp/${productReview.reviewId}`);
    await this.productMediaModel
      .deleteOne({ _id: product.productMedia })
      .exec();
    await this.productModel.deleteOne({ _id: id }).exec();
    return true;
  }

  async findOneById(id:any) {
    const product = await this.productModel
      .findById(id)
      .populate('productMedia productReview')
      .exec();
    const cloneProduct = JSON.parse(JSON.stringify(product));
    const cloneProductReview = JSON.parse(
      JSON.stringify(cloneProduct.productReview.content),
    );
    const reviewId = cloneProduct.productReview.reviewId;
    const cloneProductReviewMap = cloneProductReview.map(async (dalta: any) => {
      if (typeof dalta.insert === 'object') {
        if (!!dalta.insert && !!dalta.insert.image) {
          const data = await readFile(
            `uploads/temp/${reviewId}/${dalta.insert.image}`,
            'utf8',
          );
          dalta.insert.image = data;
        }
      }
      return dalta;
    });
    await Promise.all(cloneProductReviewMap).then(function(values) {
      cloneProduct.productReview.content = values;
    });

    return cloneProduct;
  }

  async findOneView(id:any) {
    const product = await this.findOneById(id);
    const cloneProduct = JSON.parse(JSON.stringify(product));
    const converter = new QuillDeltaToHtmlConverter(
      cloneProduct.productReview.content,
    );
    cloneProduct.productReview.content = converter.convert();
    console.log('findOneView ==>', cloneProduct.productReview.content);
    return cloneProduct;
  }

  async find(query:any) {
    const products = await this.productModel
      .find(query)
      .populate('creatorId', '_id icon username')
      .exec();

    return products as ProductDTO[];
  }

  async findOneAndUpdate(
    ProductId: string,
    updateProduct: ProductDTO,
    adminId: string,
  ) {
    const product = await this.productModel.findById(ProductId).exec();
    const productReviewData = await this.productReviewModel
      .findById(product.productReview)
      .exec();
    const productMediaData = await this.productMediaModel
      .findById(product.productMedia)
      .exec();
    const {
      productReview,
      productMedia,
      brand,
      title,
      subTitle,
      topProduct,
      description,
      image,
      link,
      price,
      productSource,
    } = updateProduct;
    product.isUpdated = true;
    product.updatedDate = Date.now();
    product.updaterId = adminId;
    if (brand) {
      product.brand = brand;
    }

    if (title) {
      product.title = title;
    }
    if (subTitle) {
      product.subTitle = subTitle;
    }
    if (topProduct) {
      product.topProduct = topProduct;
    }
    if (description) {
      product.description = description;
    }
    if (image) {
      product.image = image;
    }
    if (link) {
      product.link = link;
    }
    if (price) {
      product.price = price;
    }
    if (productSource) {
      product.productSource = productSource;
    }

    if (productReview) {
      const reviewId = (productReview as any).reviewId;
      await this.deleteFolderRecursive(`uploads/temp/${reviewId}`);
      const cloneProductReview = JSON.parse(JSON.stringify(productReview));
      console.log('cloneProductReview => ', cloneProductReview);

      const editedDalta = cloneProductReview.content.map((dalta: any) => {
        if (typeof dalta.insert === 'object') {
          if (!!dalta.insert && !!dalta.insert.image) {
            const tempID = this.tempGenerator(dalta.insert.image, reviewId);

            dalta.insert.image = tempID;
          }
        }
        return dalta;
      });

      productReviewData.content = editedDalta;

      console.log('editedDalta ==> ', editedDalta);
      await productReviewData.save();
    }

    if (productMedia) {
      if (productMedia.productImage) {
        productMediaData.productImage = productMedia.productImage;
      }
      if (productMedia.peopleImage) {
        productMediaData.peopleImage = productMedia.peopleImage;
      }
      if (productMedia.otherImage) {
        productMediaData.otherImage = productMedia.otherImage;
      }
      await productMediaData.save();
    }

    product.save();

    return true;
  }

  private tempGenerator(imageDalta: any, reviewId: any) {
    const imageTempId = uuid();

    var dir = 'uploads/temp/' + reviewId;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    var wstream = fs.createWriteStream(`${dir}/${imageTempId}`);
    wstream.write(imageDalta);
    wstream.end();
    return imageTempId;
  }
  async create(data: ProductDTO, adminId: string) {
    const {
      productReview,
      productMedia,
      brand,
      categorie,
      subCategorie,
      subSubCategorie,
      title,
      subTitle,
      topProduct,
      description,
      image,
      link,
      price,
      productSource,
    } = data;

    const reviewId = uuid();
    const productReviewDalta = await productReview.map((dalta: any) => {
      if (typeof dalta.insert === 'object') {
        if (!!dalta.insert && !!dalta.insert.image) {
          const tempID = this.tempGenerator(dalta.insert.image, reviewId);

          dalta.insert.image = tempID;
        }
      }
      return dalta;
    });
    const productReviewData = await new this.productReviewModel({
      reviewId,
      content: productReviewDalta,
    }).save();

    console.log('productReviewData after save ==> ', productReviewData);

    const productMediaData = await new this.productMediaModel({
      product_image: productMedia.productImage,
      people_image: productMedia.peopleImage,
    }).save();

    const product = await new this.productModel({
      brand,
      productReview: productReviewData._id,
      productMedia: productMediaData._id,
      creatorId: adminId,
      updaterId: adminId,
      product_review: productReviewData._id,
      product_media: productMediaData._id,
      categorie,
      subCategorie,
      subSubCategorie,
      title,
      subTitle,
      topProduct,
      description,
      image,
      link,
      price,
      productSource,
    }).save();
    return product;
  }
}
