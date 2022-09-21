import { Injectable } from '@nestjs/common';
import { MilestonsRepository } from '../repositorys/milestone.repository';
import mongoose from 'mongoose';


@Injectable()
export class MilestoneService {
    async delete_all_todos_for_task_management_table() {
        return await this.milestoneRepository.delete_all_todos_for_task_management_table()

        // throw new Error('Method not implemented.');
    }
    async delete_row_for_task_management_table(id_for_delete: any) {
        // throw new Error('Method not implemented.');
        console.log("id_for_delete : ", id_for_delete);
        return await this.milestoneRepository.delete_row_for_task_management_table(id_for_delete)
    }
    constructor(
        private readonly milestoneRepository: MilestonsRepository
    ) { }

    async update_task_status_by_id(_id: any, task_status: any) {
        console.log("_id at service: ", _id);
        return await this.milestoneRepository.update_task_status_by_id(_id, task_status);
    }

    async delete_todos_for_rows_for_task_management_table(ids_for_delete_todos: any) {
        const result = await this.milestoneRepository.delete_todos_for_rows_for_task_management_table(ids_for_delete_todos);
        return result
    }

    async save_rows_for_task_management_table(data: any) {

        console.log("data at service : ", data);
        console.log("data.id : ", data.id);

        let isRowExist;
        let save_count = 0;
        let result_for_save;

        if (mongoose.isValidObjectId(data.id)) {
            isRowExist = await this.milestoneRepository.investigate_existence_by_id_for_save_rows_for_task_management_table(data.id);
        } else {
            isRowExist = false
        }

        if (isRowExist) {
            console.log("row 존재 so 업데이트");
        } else {
            console.log("row 비존재 so 저장");
            result_for_save = await this.milestoneRepository.save_rows_for_task_management_table({
                task_title: data[0].task_title,
                task_status: data[0].task_status,
                started_at: new Date(Date.now())
            });
        }
        console.log("result_for_save !!!!!!!! ", result_for_save);

        if (result_for_save !== undefined) {
            console.log("result_for_save 1122 : ", result_for_save);
        } else {
            console.log("result is empty");
        }

        return result_for_save;
    }

    get_rows_from_task_management_table() {
        console.log("마일 스톤 서비스 호출 !");
        const allListForMileStone = this.milestoneRepository.get_rows_from_task_management_table();

        return allListForMileStone
        // throw new Error('Method not implemented.');
    }

}
