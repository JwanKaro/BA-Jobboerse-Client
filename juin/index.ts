import * as fs from 'fs';
import * as path from "path"
import * as crypto from "crypto";
type environment = {
    "development": string,
    "production": string
}

export module Juin {
    export module Environment {
        /**
         * It loads the environment variables from a file and assigns them to the *process.env* 
         * 
         * <br>
         * 
         * flags can be combiend. 
         * The flags will be removed from the key.
         * 
         * flags:
         *  - `_PATH`: path to the file to load it's content
         *  - `_JSON`: To stringfiy JSON file 
         *
         * 
         * @param {environment} type 
         * @param {string} path 
         */
        export const load = <T extends keyof environment>(type: T, path: string) => {
            process.env.NODE_ENV = type
            const file = loadFile(path)
            const envVaribles = parseFile(file)
            for (const key in envVaribles) {
                process.env[key] = envVaribles[key];
            }

        }
        const loadFile = (filePath: string) => {
            if (!fs.existsSync(path.relative(process.cwd(), filePath)))
                throw new Error(`Cannot load file variable "${path.relative(process.cwd(), filePath)}"`)
            return fs.readFileSync(path.relative(process.cwd(), filePath), 'utf8')
        }

        const parseFile = (file: string) => {
            var variables: { [key: string]: string } = {}
            const environmentVariablesRaw: string[] = file.split("\n")
            for (let i = 0; i < environmentVariablesRaw.length; i++) {
                const env = environmentVariablesRaw[i]
                var [key, value] = env.replace("\r", "").split("=")
                var fileContent: string | null = null;
                if (!value) continue;
                if (value.startsWith('"') && value.endsWith('"'))
                    value = value.slice(1, -1)
                if (value.startsWith("'") && value.endsWith("'"))
                    value = value.slice(1, -1)
                // filter flags 
                if (key.match(/_PATH/g)) {
                    fileContent = loadFile(value)
                    key = key.replace(/_PATH/g, "")
                }
                if (key.match(/_JSON/g) && fileContent) {
                    fileContent = JSON.stringify(JSON.parse(fileContent))
                    key = key.replace(/_JSON/g, "")

                }
                else if (key.match(/_JSON/g)) {
                    console.log(value);

                    fileContent = JSON.stringify(JSON.parse(value))
                    key = key.replace(/_JSON/g, "")

                }
                if (fileContent === null) {
                    variables[key] = value
                    continue;
                }
                variables[key] = fileContent
            }
            return variables
        }

    }
    export module Storage {
        export class Persistence {
            readonly _path: string;
            constructor(path: string) {
                this._path = path;
            }


            private static encrypt = (text: string) => {
                if (!process.env.BA_ENCRYPTION_KEY) throw new Error("no encryption key was found in environment")
                const iv = crypto.randomBytes(16)
                const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(process.env.BA_ENCRYPTION_KEY, "base64"), iv);
                const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
                return {
                    iv: iv.toString("hex"),
                    content: encrypted.toString('hex')
                };
            };

            private static decrypt = (hash: { iv: any; content: string; }) => {
                if (!process.env.BA_ENCRYPTION_KEY) throw new Error("no encryption key was found in environment")
                const decipher = crypto.createDecipheriv("aes-256-ctr", Buffer.from(process.env.BA_ENCRYPTION_KEY, "base64"), Buffer.from(hash.iv, 'hex'));
                const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
                return decrpyted.toString();
            };


            setItem(key: string, value: string): void {
                var fileContent = fs.readFileSync(this._path, { flag: "a+" }).toString("utf-8");
                const fileObject = fileContent.length == 0 ? {} : JSON.parse(fileContent.replace("/r", ""));

                fileObject[key] = Persistence.encrypt(value)
                fs.writeFileSync(this._path, JSON.stringify(fileObject));
            }
            getItem(key: string) {
                var fileContent = fs.readFileSync(this._path, { flag: "a+" }).toString("utf-8");
                const fileObject = fileContent.length == 0 ? {} : JSON.parse(fileContent.replace("/r", ""));
                if (fileObject[key] == undefined)
                    return undefined;
                return Persistence.decrypt(fileObject[key])
            }

        }
        export class Memory {
            constructor() {
                throw new Error("Memory is not implemented");
            }
        }

    }
}
export default Juin