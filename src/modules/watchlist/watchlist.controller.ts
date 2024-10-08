import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CreateAssetResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService) {}

    @ApiTags('API')
    @ApiResponse({status: 201, type: CreateAssetResponse}) //201 - статус создания
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAsset(@Body() assetDto: WatchListDTO, @Req() request): Promise<CreateAssetResponse> {
        const user = request.user;
        return this.watchlistService.createAsset(user, assetDto)
    }

    @ApiTags('API')
    @ApiResponse({status: 200}) //200 - статус выполнения какой-либо операции
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteAsset(@Query('id') assetId: string, @Req() request): Promise<boolean> {
        const {id} = request.user  //достаем конкретный параметр из юзера
        return this.watchlistService.deleteAsset(id, assetId)
    }
}
