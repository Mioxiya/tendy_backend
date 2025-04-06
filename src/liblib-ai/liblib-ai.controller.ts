import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LiblibAiService } from './liblib-ai.service';
import { GenerateStatusDto, Text2ImgDto } from './dto/aiImage.dto';

@Controller('aiImage')
export class LiblibAiController {
  constructor(private readonly service: LiblibAiService) {}

  @Post('text2img')
  async text2img(@Body() dto: Text2ImgDto) {
    const url = this.service.generateSignedUrl(
      '/api/generate/webui/text2img/ultra',
    );
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        templateUuid: '5d7e67009b344550bc1aa6ccbfa1d7f4',
        generateParams: {
          prompt: dto.prompt,
          // aspectRatio: 'portrait',
          imageSize: dto.imageSize,
          imgCount: 1,
          steps: dto.steps,
        },
      }),
    });
    return (await res.json()) as never;
  }

  @Get('status')
  async getStatus(@Query() dto: GenerateStatusDto) {
    const url = this.service.generateSignedUrl('/api/generate/webui/status');
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        generateUuid: dto.generateUuid,
      }),
    });
    return (await res.json()) as never;
  }
}
