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
