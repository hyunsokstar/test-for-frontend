import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";


const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class ColumnsTable extends Document {

  @ApiProperty({
    example: "users_table",
    description: "테이블 이름"
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  table_name: string;

  @ApiProperty({
    example: "key",
    description: "column key"
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    example: "name",
    description: "column name"
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "width",
    description: "컬럼 길이"
  })
  @Prop()
  width: number;

  @ApiProperty({
    example: "editor",
    description: "에디터 종류"
  })
  @Prop({
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  editor: string;

  @ApiProperty({
    example: "formatter",
    description: "포매터 종류"
  })
  @Prop({
    required: false,
  })
  @IsString()
  formatter: string;

  @ApiProperty({
    example: "order",
    description: "컬럼"
  })
  @Prop()
  order: number;

  @ApiProperty({
    example: "true",
    description: "노출 여부"
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  hidden: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  resizable: string;

  readonly readOnlyData: {
    id: string;
    key: string;
    name: string;
    width: number;
  };

}

export const ColumnsSchema = SchemaFactory.createForClass(ColumnsTable);

ColumnsSchema.virtual('readOnlyData').get(function (this: ColumnsTable) {
  return {
    id: this.id,
    key: this.key,
    name: this.name,
    width: this.width
  }
})
