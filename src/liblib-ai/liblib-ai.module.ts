import { Module } from '@nestjs/common';
import { LiblibAiController } from './liblib-ai.controller';
import { LiblibAiService } from './liblib-ai.service';

@Module({
  controllers: [LiblibAiController],
  providers: [LiblibAiService],
})
export class LiblibAiModule {}
