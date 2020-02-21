
import { parse } from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
         private readonly envConfig: EnvConfig;

         constructor(path: string = 'development') {
           this.envConfig = this.validateConfig(parse(fs.readFileSync('.env')));
         }


         private validateConfig(envConfig: EnvConfig) {
           const envSchema = Joi.object({
             NODE_ENV: Joi.string()
               .valid('development', 'production', 'test', 'provision')
               .default('development'),
             PORT: Joi.number().default(7000),
             API_AUTH_ENABLED: Joi.boolean().required(),
             MONGO_URL: Joi.string().required(),
             GOOGLE_CLIENT_ID: Joi.string().required(),
             GOOGLE_CLIENT_SECRET: Joi.string().required(),
             GOOGLE_CALLBACK_URL: Joi.string().required(),
             JWT_SECRET_KEY: Joi.string().required(),
             CLIENT_DOMAIN: Joi.string().required(),
             ORIGIN_DOMAIN: Joi.string().required(),
             CACHE_TTL: Joi.number().default(50),
           });

           const { error, value } = Joi.validate(envConfig, envSchema);

           if (error) {
             throw new Error(`Config validation error: ${error.message}`);
           }

           return value;
         }

         get isApiAuthEnabled(): boolean {
           return Boolean(this.envConfig.API_AUTH_ENABLED);
         }
         get mongoURL(): string {
           return String(this.envConfig.MONGO_URL);
         }

         get googleCallbackURL(): string {
           return String(this.envConfig.GOOGLE_CALLBACK_URL);
         }

         get googleClientSecret(): string {
           return String(this.envConfig.GOOGLE_CLIENT_SECRET);
         }

         get googleClientID(): string {
           return String(this.envConfig.GOOGLE_CLIENT_ID);
         }

         get jwtSecretKey(): string {
           return String(this.envConfig.JWT_SECRET_KEY);
         }
         public get(key: string): string {
           return this.envConfig[key];
         }

         get clientDomain(): string {
           return String(this.envConfig.CLIENT_DOMAIN);
         }

         get originDomain(): string {
           return String(this.envConfig.ORIGIN_DOMAIN);
         }
       }


// import * as dotenv from 'dotenv';
// import * as Joi from 'joi';
// import * as fs from 'fs';

// export type EnvConfig = Record<string, string>;

// export class ConfigService {
//   private readonly envConfig: EnvConfig;

//   constructor(filePath: string) {
//     const config = dotenv.parse(fs.readFileSync('.env'));
//     this.envConfig = this.validateInput(config);
//   }

//   /**
//    * Ensures all needed variables are set, and returns the validated JavaScript object
//    * including the applied default values.
//    */
//   private validateInput(envConfig: EnvConfig): EnvConfig {
//     const envVarsSchema: Joi.ObjectSchema = Joi.object({
//       NODE_ENV: Joi.string()
//         .valid('development', 'production', 'test', 'provision')
//         .default('development'),
//       PORT: Joi.number().default(7000),
//       API_AUTH_ENABLED: Joi.boolean().required(),
//       MONGO_URL: Joi.string().required(),
//       GOOGLE_CLIENT_ID: Joi.string().required(),
//       GOOGLE_CLIENT_SECRET: Joi.string().required(),
//       GOOGLE_CALLBACK_URL: Joi.string().required(),
//       JWT_SECRET_KEY: Joi.string().required(),
//       CLIENT_DOMAIN: Joi.string().required(),
//       ORIGIN_DOMAIN: Joi.string().required(),
//       CACHE_TTL: Joi.number().default(50),
//     });

//     const { error, value: validatedEnvConfig } = Joi.validate(
//       envConfig,
//       envVarsSchema,
//     );
//     if (error) {
//       throw new Error(`Config validation error: ${error.message}`);
//     }
//     return validatedEnvConfig;
//   }
  
  // get isApiAuthEnabled(): boolean {
  //   return Boolean(this.envConfig.API_AUTH_ENABLED);
  // }
  // get mongoURL(): string {
  //   return String(this.envConfig.MONGO_URL);
  // }

  // get googleCallbackURL(): string {
  //   return String(this.envConfig.GOOGLE_CALLBACK_URL);
  // }

  // get googleClientSecret(): string {
  //   return String(this.envConfig.GOOGLE_CLIENT_SECRET);
  // }

  // get googleClientID(): string {
  //   return String(this.envConfig.GOOGLE_CLIENT_ID);
  // }

  // get jwtSecretKey(): string {
  //   return String(this.envConfig.JWT_SECRET_KEY);
  // }
  //   public get(key: string): string {
  //   return this.envConfig[key];
  // }

  // get clientDomain(): string {
  //   return String(this.envConfig.CLIENT_DOMAIN);
  // }

  // get originDomain(): string {
  //   return String(this.envConfig.ORIGIN_DOMAIN);
  // }
// }
