import { MilestoneService } from '../services/milestone.service';
import {
    Controller,
    UseInterceptors,
    Get
} from '@nestjs/common';
import { SuccessInterceptor } from '../../common/interceptors/success.interceptor';


@Controller('milestone')
@UseInterceptors(SuccessInterceptor)
export class MilestoneController {

    constructor(
        private readonly milestoneService: MilestoneService,
    ) { }

    @Get()
    getMileStone() {
        const allListForMileStone = this.milestoneService.allListForMileStoneTable();
        console.log("allListForMileStone : ", allListForMileStone);       
        return allListForMileStone
    }

}
