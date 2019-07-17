import fs from 'fs';

export class FileReader {

    public readFileAsync (fileName: string) : Promise<Buffer>
    {
        return new Promise((resolve, reject) => {

            fs.readFile(fileName, (error, buffer) => {

                if(error) {
                    reject(error);
                }
                else {

                    resolve(buffer);
                }
            })
        });
    }
}