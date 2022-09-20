import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';
import { task_management_table } from '../schemas/task_management_table.schema';


@Injectable()
export class MilestonsRepository {

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

        const filter = { _id: _id };
        const update = { task_status: task_status };
        
        // `doc` is the document _before_ `update` was applied
        return await this.task_management_table_model.findOneAndUpdate(filter, update);

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
