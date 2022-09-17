import { MilestonsRepository } from './repositorys/milestone.repository';
import { Module } from '@nestjs/common';
import { MilestoneController } from './controllers/milestone.controller';
import { MilestoneService } from './services/milestone.service';
import { MongooseModule } from '@nestjs/mongoose';
import { task_management_table, task_management_table_schema } from './schemas/task_management_table.schema';


@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: task_management_table.name, schema: task_management_table_schema }
      ]
    )
  ],

  controllers: [MilestoneController],
  providers: [MilestoneService, MilestonsRepository],
  
})

export class MilestoneModule { }
