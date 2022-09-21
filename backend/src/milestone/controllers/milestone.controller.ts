import { MilestoneService } from './../services/milestone.service';
import {
    Controller,
    UseInterceptors,
    Get,
    Post,
    Body
} from '@nestjs/common';
import { SuccessInterceptor } from '../../common/interceptors/success.interceptor';
// import { MilestoneService } from '../services/milestone.service';


@Controller('milestone')
@UseInterceptors(SuccessInterceptor)
export class MilestoneController {

    constructor(
        private readonly milestoneService: MilestoneService,
    ) { }

    @Get()
    get_rows_from_task_management_table() {
        const allListForMileStone = this.milestoneService.get_rows_from_task_management_table();
        console.log("allListForMileStone : ", allListForMileStone);
        return allListForMileStone;
    }

    @Post("save_rows_for_task_management_table")
    async save_rows_for_task_management_table(@Body() data) {
        const save_result_for_task_management_table = await this.milestoneService.save_rows_for_task_management_table(data);
        return save_result_for_task_management_table;
    }

    @Post("delete_todos_for_rows_for_task_management_table")
    async delete_todos_for_rows_for_task_management_table(@Body() data) {
        const ids_for_delete_todos = data
        // console.log("ids_for_delete_todos : ", ids_for_delete_todos);
        return this.milestoneService.delete_todos_for_rows_for_task_management_table(ids_for_delete_todos);
        // return "삭제 성공 !!"
    }

    @Post("update_task_status")
    async update_task_status(@Body() data) {
        const { _id, task_status } = data;

        return this.milestoneService.update_task_status_by_id(_id, task_status);
    }

    @Post("delete_row_for_task_management_table")
    async delete_row_for_task_management_table(@Body() data) {
        console.log("data : ", data);
        const { id_for_delete } = data;
        console.log("id_for_delete : ", id_for_delete);
        return this.milestoneService.delete_row_for_task_management_table(id_for_delete);
    }
    @Post("delete_all_todos_for_task_management_table")
    async delete_all_todos_for_task_management_table(@Body() data) {
        return this.milestoneService.delete_all_todos_for_task_management_table();
    }

    // @Post("deleteMembers")
    // async deleteMultiUsers(@Body() data) {
    //   console.log("유저 테이블 정보 저장 check !!");
    //   // console.log("body data : ", data);

    //   const ids_for_delete_users = data 
    //   console.log("ids_for_delete_users : ", ids_for_delete_users);

    //   return this.CatsService.deleteMultiUsers(ids_for_delete_users);
    // }

}
