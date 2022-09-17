import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { task_management_table } from '../schemas/task_management_table.schema';


@Injectable()
export class MilestonsRepository {
    async investigate_existence_by_id_for_save_rows_for_task_management_table(id: any) {

        const result = await this.task_management_table_model.exists({ _id: id });
        if (result) return true
        else return false
        // throw new Error('Method not implemented.');
    }
    constructor(
        @InjectModel(task_management_table.name) private readonly task_management_table_model: Model<task_management_table>,
    ) { }


    async save_rows_for_task_management_table(row: any) {
        // console.log("row : ", row);
        return await this.task_management_table_model.create(row);
    }

    async all_list_for_task_management_table() {
        // console.log("레포지터리 실행 확인 for milestone !");
        const dummy_list_for_milestone = [
            {
                id: 1,
                todo: "컬럼 리오더링 구현 하기",
                member: "hyunsok",
                period: {
                    start_time: "2209151311",
                    end_time: "2209151321"
                }
            },
            {
                id: 2,
                todo: "에디터 10, 포매터10 스토리북으로 정리",
                member: "hyunsok",
                period: {
                    start_time: "2209151311",
                    end_time: "2209151321"
                }
            }
        ]
        return dummy_list_for_milestone;
    }

}
