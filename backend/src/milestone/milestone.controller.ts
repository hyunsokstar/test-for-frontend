import { MilestoneService } from './milestone.service';
import {
    Controller,
    //
    UseInterceptors,
    Get
} from '@nestjs/common';
//
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';


@Controller('milestone')
@UseInterceptors(SuccessInterceptor)
export class MilestoneController {

    constructor(
        private readonly milestoneService: MilestoneService,
    ) { }

    @Get()
    getMileStone() {
    //   return cat.readOnlyData;
        return "milestone response for default request"
    }

}
