import { Injectable } from '@nestjs/common';

import { createHmac, randomBytes } from 'crypto';

@Injectable()
export class LiblibAiService {
  private generateNonce(length = 16): string {
    return randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  private base64UrlSafeEncode(buffer: Buffer): string {
    return buffer
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  generateSignedUrl(path: string): string {
    const secretKey = process.env.LIBLIB_SECRET_KEY;
    const accessKey = process.env.LIBLIB_ACCESS_KEY;

    if (!secretKey || !accessKey) {
      throw new Error('Missing LiblibAI credentials');
    }

    const timestamp = Date.now();
    const signatureNonce = this.generateNonce(16);
    const signString = `${path}&${timestamp}&${signatureNonce}`;

    const hmac = createHmac('sha1', secretKey);
    hmac.update(signString);
    const signature = this.base64UrlSafeEncode(hmac.digest());

    const queryParams = new URLSearchParams({
      AccessKey: accessKey,
      Signature: signature,
      Timestamp: timestamp.toString(),
      SignatureNonce: signatureNonce,
    });

    return `https://openapi.liblibai.cloud${path}?${queryParams}`;
  }
}
