import {RestConnector} from '../connectors/RestConnector';
import {Account} from '../models/User';

export class AccountGateway {
  private restConnector: RestConnector;

  constructor(connector: {restConnector: RestConnector}) {
    this.restConnector = connector.restConnector;
  }

  public async create(account: Account) {
    const {data} = await this.restConnector.post('/accounts', account);
    return data;
  }

  public async find({pageIndex, pageSize, filters, orders}) {
    const filter = {
      offset: pageIndex * pageSize,
      limit: pageSize,
      skip: pageIndex * pageSize,
      where: filters,
      order: orders,
    };
    console.log(JSON.stringify(filter.where));

    const [resData, resCount] = await Promise.all([
      this.restConnector.get(`/accounts?filter=${JSON.stringify(filter)}`),
      this.restConnector.get(`/accounts/count`),
    ]);
    const AccountCount = resCount.data.count;
    const pageCount = AccountCount / pageSize + (AccountCount % pageSize > 0 ? 1 : 0);
    return {
      data: resData.data,
      pageCount,
    };
  }

  public async update(id: string, account: Account) {
    const {data} = await this.restConnector.patch(`accounts/${id}`, account);
    return data;
  }

  public async findOne(id: string) {
    const {data} = await this.restConnector.get(`/accounts/${id}`);
    return data;
  }
}
