import { Injectable } from '@nestjs/common';
import { MilestonsRepository } from '../repositorys/milestone.repository';
import mongoose from 'mongoose';


@Injectable()
export class MilestoneService {
    constructor(
        private readonly milestoneRepository: MilestonsRepository
    ) { }

    async delete_todos_for_rows_for_task_management_table(ids_for_delete_todos: any) {

        // const ids_for_delete = data.ids_for_delete;
        const result = await this.milestoneRepository.delete_todos_for_rows_for_task_management_table(ids_for_delete_todos);

        console.log('result : ', result);

        // throw new Error('Method not implemented.');
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
                task_status: data[0].task_status
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
