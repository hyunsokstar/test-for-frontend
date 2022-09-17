import {
    Controller,
    UseInterceptors,
    Get,
    Post,
    Body
} from '@nestjs/common';
import { SuccessInterceptor } from '../../common/interceptors/success.interceptor';
import { MilestoneService } from '../services/milestone.service';


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
        return allListForMileStone;
    }

    @Post("save_rows_for_task_management_table")
    async save_rows_for_task_management_table(@Body() data) {
        console.log("data for save_rows_for_task_management_table : ", data);
        const save_result_for_task_management_table = await this.milestoneService.save_rows_for_task_management_table(data);
        console.log("save_result_for_task_management_table : ", save_result_for_task_management_table);
        return save_result_for_task_management_table;
    }

}
