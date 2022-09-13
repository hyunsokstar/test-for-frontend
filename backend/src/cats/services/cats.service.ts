import { log } from 'console';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../cats.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CatRequestDto } from '../dto/cats.request.dto';
import { CatsRepository } from '../cats.repository';


@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) { }
  // constructor(private readonly catsRepository: CatsRepository) { }

  async saveRowsForUsersTable(data: any) {
    const { users } = data;
    console.log("users : ", users);

    users.map(async (user, index) => {
      let isUserExist;

      if (user.email) {
        isUserExist = await this.catsRepository.existsByIdForRowsForUsersTable(user._id);
      } else {
        isUserExist = false
      }

      console.log("isUserExist : ", isUserExist);

      if (isUserExist) {
        console.log("회원 정보가 이미 존재 so update", index);

        const filter = { _id: user._id }
        const result = await this.catsRepository.updateForUsersTable(
          filter,
          {
            email: user.email,
            name: user.name,
            todo: user.todo,
            test_complete: user.test_complete
          }
        )

      } else {
        console.log("회원 정보 생성 for RowsForUsersTable!", index);

        // const hashedPassword = await bcrypt.hash(user.password, 10);

        const result = await this.catsRepository.createForUsersTable({
          email: user.email,
          name: user.name,
          todo: user.todo,
          test_complete: user.test_complete
        });

        // console.log("cat save result :: ", cat);
      }

    });

    // throw new Error('Method not implemented.');
  }

  async updateColumWidthForTableAndKey(data: any) {
    // throw new Error('Method not implemented.');
    await this.catsRepository.updateColumWidthForTableAndKey(data);
  }

  async findAllColumnsTable(table_name: string, pageNum: number, limit: number) {

    const allColumnsTable = await this.catsRepository.findAllColumnsTable(table_name, pageNum, limit);
    return allColumnsTable

  }

  async getAllColumnsForUsersTableWithoutPagination(table_name: string) {
    // const allColumnsTable = await this.catsRepository.findAllColumnsTable(table_name, pageNum, limit);
    const allColumnsTable = await this.catsRepository.findAllColumnsWithoutPagination(table_name);
    return allColumnsTable
  }

  async allCatsColumns(table_name: string) {
    // const allColumnsTable = await this.catsRepository.findAllColumnsTable(table_name, pageNum, limit);
    const allColumnsTable = await this.catsRepository.allCatsColumns();
    return allColumnsTable
  }


  async deleteColumns(data: any) {
    // throw new Error('Method not implemented.');
    const ids_for_delete = data.ids_for_delete;
    const result = await this.catsRepository.deleteColumnsByIdsArray(ids_for_delete);

  }

  async saveMultiUsers(data: any) {
    const { users } = data;

    users.map(async (user, index) => {
      let isCatExist;

      if (mongoose.isValidObjectId(user.id)) {
        isCatExist = await this.catsRepository.existsById(user.id);

      } else {
        isCatExist = false
      }
      console.log("isCatExist : ", isCatExist);

      if (isCatExist) {
        console.log("회원 정보가 이미 존재", index);
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const filter = { _id: user.id }
        const cat = await this.catsRepository.update(filter, { email: user.email, name: user.name, password: hashedPassword, height: user.height, gender: user.gender })

      } else {
        console.log("회원 정보 생성 !", index);

        const hashedPassword = await bcrypt.hash(user.password, 10);


        const cat = await this.catsRepository.create({
          email: user.email,
          name: user.name,
          password: hashedPassword,
          height: user.height,
          gender: user.gender,
        });

        // console.log("cat save result :: ", cat);
      }

    })

    return "회원 정보 저장 성공 !!"

  }

  async saveDataForTodosTable(data: any) {
    const { todos } = data;
    console.log("todos : ", todos);

    todos.map(async (todo, index) => {
      let isTodoExist;

      if (mongoose.isValidObjectId(todo.id)) {
        isTodoExist = await this.catsRepository.findByIdForTodosTable(todo.id);

      } else {
        isTodoExist = false
      }

      if (isTodoExist) {
        console.log("todo가 존재함을 확인 !! ");

        const filter = { _id: todo.id }

        const todoUpdateResult = await this.catsRepository.updateTodosTable(filter,
          {
            todo: todo.todo,
            level: todo.level,
            page: todo.page,
            manager: todo.manager
          })

        console.log("todoUpdateResult : ", todoUpdateResult);


        return todoUpdateResult;

      } else {
        console.log("todo가 존재하지 않음을 확인 !! ");
        console.log("todo 생성 시도 확인", todo, index);

        const create_result = await this.catsRepository.createForTodosTable({
          todo: todo.todo,
          level: todo.level,
          page: todo.page,
          manager: todo.manager,
        });

        return create_result;

      }

    })

    return "todos table 에 데이터 저장 하기 !!"

  }

  async searchUsers(searchOption: string, searchKeyword: string) {
    return await this.catsRepository.searchUsers(searchOption, searchKeyword)
  }

  hiCatService() {
    return "hi cat ser !!"
  }

  async uploadImg(rowId: string, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    console.log("fileName : ", fileName);

    return await this.catsRepository.findByIdAndUpdateImg(
      rowId,
      fileName,
    );

  }

  async deleteMultiUsers(data: any) {
    const ids_for_delete = data.ids_for_delete;
    const result = await this.catsRepository.deleteUsersByIdsArray(ids_for_delete);    

    console.log('result : ', result);

    return "회원 정보 삭제 성공";
  }

  async deleteRowsForTaskBoard(data: any) {
    const ids_for_delete = data.ids_for_delete;
    // const result = await this.catsRepository.deleteUsersByIdsArray(ids_for_delete);    
    const result = await this.catsRepository.deleteRowsForTaskBoard(ids_for_delete);    

    console.log('result : ', result);

    return "회원 정보 삭제 성공";
  }


  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;


    console.log("password at aservice: ", password);
    

    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      return "이미 있는 고양이"
      throw new UnauthorizedException("해당하는 고양이는 이미 존재합니다");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
      height: 177,
      gender: "man"
    });

    return cat.readOnlyData;
  }

  async findAllCats() {
    const allCats = await this.catsRepository.findAllCats();

    return allCats
  }

  async getListForUsersTable() {
    const allRowsForUsersTable = await this.catsRepository.getListForUsersTable();

    return allRowsForUsersTable
  }
  async getListByTableName(table_name: string) {
    // const allRowsForUsersTable = await this.catsRepository.getListForUsersTable();
    const allRowsForUsersTable = await this.catsRepository.getListByTableName(table_name);

    return allRowsForUsersTable
  }

  // getGridDataByTableName
  async getGridDataByTableName(table_name: any, pageNum: number, limit: number) {
    // console.log("table_name at service: ", table_name);

    const dataForGrid = await this.catsRepository.getGridDataByTableName(table_name, pageNum, limit);
    // console.log("dataForGrid : ", dataForGrid);

    return dataForGrid
  }

  async saveColumnDatas(data: any) {
    const { columns } = data;
    // console.log("columns at service for saveColumnsDatas: ", data);
    data.map(async (column) => {

      const isKeyExist = await this.catsRepository.existsByKey(column._id);
      // console.log("key 존재 여부 : ", isKeyExist);

      if (isKeyExist) { // 이미 key 가 존재 <=>  업데이트

        console.log("update 확인 ", column);

        const filter = { table_name: column.table_name, key: column.key }

        const catColumn = await this.catsRepository.updateColumnsTable(filter,
          {
            table_name: column.table_name,
            key: column.key,
            name: column.name,
            width: column.width,
            editor: column.editor,
            formatter: column.formatter,
            order: column.order,
            hidden: column.hidden,
            resizable: column.resizable

          })

      } else { // 없을 경우 <=> save
        console.log("save 확인 ", column);

        const result = await this.catsRepository.createColumns
          ({
            table_name: column.table_name,
            key: column.key,
            name: column.name,
            width: column.width,
            editor: column.editor,
            formatter: column.formatter,
            order: column.order,
            hidden: column.hidden,
            resizable: column.resizable
          });
      }

    })

  }

  async saveForTodos(data: any) {
    const { columns } = data;

    data.map(async (column) => {

      const isKeyExist = await this.catsRepository.existsByKey(column._id);
      // console.log("key 존재 여부 : ", isKeyExist);

      if (isKeyExist) { // 이미 key 가 존재 <=>  업데이트

        console.log("update 확인 ", column);

        const filter = { table_name: column.table_name, key: column.key }

        const catColumn = await this.catsRepository.updateColumnsTable(filter,
          {
            table_name: column.table_name,
            key: column.key,
            name: column.name,
            width: column.width,
            editor: column.editor,
            formatter: column.formatter,
            order: column.order,
            hidden: column.hidden,
            resizable: column.resizable

          })

      } else { // 없을 경우 <=> save
        console.log("save 확인 ", column);

        const result = await this.catsRepository.createColumns
          ({
            table_name: column.table_name,
            key: column.key,
            name: column.name,
            width: column.width,
            editor: column.editor,
            formatter: column.formatter,
            order: column.order,
            hidden: column.hidden,
            resizable: column.resizable
          });
      }

    })

  }

  // todos 
  // list
  async getAllTodosForUsersTable(pageNum: number, limit: number) {
    const allTodos = await this.catsRepository.getAllTodosForUsersTable(pageNum, limit);
    return allTodos
  }

}
