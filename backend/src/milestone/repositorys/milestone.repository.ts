import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';
import { task_management_table } from '../schemas/task_management_table.schema';


@Injectable()
export class MilestonsRepository {
    async delete_all_todos_for_task_management_table () {
        // throw new Error('Method not implemented.');
        return await this.task_management_table_model.deleteMany({});
        // 출처: https://progdev.tistory.com/45 [플머의 개발 연구소:티스토리]
        
    }
    async delete_row_for_task_management_table(id_for_delete: any) {
        // throw new Error('Method not implemented.'); 
        return await this.task_management_table_model.deleteOne({ _id: id_for_delete });

    }

    async delete_todos_for_rows_for_task_management_table(ids_for_delete_todos: any) {
        console.log("ids_for_delete_todos : ", ids_for_delete_todos);

        ids_for_delete_todos.map((el) => {
            if (!mongoose.Types.ObjectId.isValid(el)) {
                console.log("유효하지 않습니다 !");
            } else {
                console.log("유효 합니다 ");

            }
        })

        const result = await this.task_management_table_model.deleteMany(
            {
                _id: {
                    $in: ids_for_delete_todos
                }
            },
        );
        return result;

    }

    async update_task_status_by_id(_id: any, task_status: any) {
        // throw new Error('Method not implemented.');

        // 1122

        const completed_time = new Date(Date.now())
        const original = await this.task_management_table_model.findOne({_id: _id});
        const started_at = original.started_at ? original.started_at : new Date(Date.now())

        const elapsed_time = Math.round((completed_time.getTime() - started_at.getTime()) / (1000 * 60));
        
        // console.log("1 , 2", completed_time.getTime() , original.started_at.getTime());
        
        console.log("elapsed_time : ", elapsed_time);
        
        // const original_created_at = original_row.createdAt;
        // console.log("original_created_at : ", original_created_at);
        // console.log("elapsed_time : ", new Date(Date.now())- original_created_at)
        


        const filter = { _id: _id };
        const update = { 
            task_status: task_status,
            started_at: original.started_at,
            elapsed_time: elapsed_time,
            completed_at: new Date(Date.now()),
        };

        // `doc` is the document _before_ `update` was applied
        await this.task_management_table_model.findOneAndUpdate(filter, update);
        const response = await this.task_management_table_model.findOne({_id: _id});
        console.log("response : ", response);
        return response;
    }

    async investigate_existence_by_id_for_save_rows_for_task_management_table(id: any) {
        const result = await this.task_management_table_model.exists({ _id: id });
        if (result) return true
        else return false
    }
    constructor(
        @InjectModel(task_management_table.name) private readonly task_management_table_model: Model<task_management_table>,
    ) { }


    async save_rows_for_task_management_table(row: any) {
        return await this.task_management_table_model.create(row);
    }

    async get_rows_from_task_management_table() {

        const data_from_task_management_table_model = await this.task_management_table_model.find({}).sort({ _id: 1 })

        return data_from_task_management_table_model;
    }

}
