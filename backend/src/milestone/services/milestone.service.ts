import { Injectable } from '@nestjs/common';
import { MilestonsRepository } from '../repositorys/milestone.repository';
import mongoose from 'mongoose';


@Injectable()
export class MilestoneService {
    constructor(private readonly milestoneRepository: MilestonsRepository) { }

    async save_rows_for_task_management_table(data: any) {

        console.log("data at service : ", data);
        console.log("data.id : ", data.id);

        let isRowExist;
        let save_count = 0;

        if (mongoose.isValidObjectId(data.id)) {
            isRowExist = await this.milestoneRepository.investigate_existence_by_id_for_save_rows_for_task_management_table(data.id);
        } else {
            isRowExist = false
        }

        if (isRowExist) {
            console.log("row 존재 so 업데이트");
        } else {
            console.log("row 비존재 so 저장");
            data.map(async (row) => {
                await this.milestoneRepository.save_rows_for_task_management_table({
                    task_title: row.task_title,
                    task_status: row.task_status
                });
                save_count = save_count + 1
            })
        }
        return `${save_count} row 저장 성공 !`
    }

    allListForMileStoneTable() {
        console.log("마일 스톤 서비스 호출 !");
        const allListForMileStone = this.milestoneRepository.all_list_for_task_management_table();

        return allListForMileStone
        // throw new Error('Method not implemented.');
    }

}
