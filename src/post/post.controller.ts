import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostService } from './post.service';

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
    constructor(
        private postService: PostService,
    ) {}

    @Get('')
    posts() {
        return this.postService.posts();
    }

    @Get('/:id')
    getPost(@Param('id') id: number) {
        return this.postService.getPost(id);
    }

    @Get('/my')
    getMyPost(@Req() req) {
        const uid = req.user;

        return this.postService.getMyPost(uid);
    }

    @Post('create')
    createPost(@Req() req, @Body() post: CreatePostDTO) {
        const uid = req.user
        const postData = { uid, ...post };

        return this.postService.createPost(postData);
    }

    @Delete('delPost/:id')
    deletePost(@Param('id') id: number) {
        return this.postService.deletePost(id);
    }
}
