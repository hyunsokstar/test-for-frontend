import { Injectable } from '@nestjs/common';
import { MilestonsRepository } from '../repositorys/milestone.repository';


@Injectable()
export class MilestoneService {

    allListForMileStoneTable() {
        console.log("마일 스톤 서비스 호출 !");
        const allListForMileStone = MilestonsRepository.allListForMileStonTable();

        return allListForMileStone
        // throw new Error('Method not implemented.');
    }

}
