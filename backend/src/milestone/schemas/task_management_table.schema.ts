import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import { ApiProperty } from "@nestjs/swagger";


const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class task_management_table extends Document {

  @Prop({
    required: true,
  })
  task_title: string;

  @Prop({
    required: true,
  })


  @Prop()
  task_status: boolean;

  readonly readOnlyData: {
    task_title: string;
    task_status: string;
  };

}

export const task_management_table_schema = SchemaFactory.createForClass(task_management_table);

task_management_table_schema.virtual('readOnlyData').get(function (this: task_management_table) {
  return {
    task_title: this.task_title,
    task_status: this.task_status
  }
})
