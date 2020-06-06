import User from '@modules/users/infra/typeorm/entities/User';

interface IItem {
  item_id: string;
}

export default interface ICreatePointDTO {
  user: User;
  name: string;
  image: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
  latitude: number;
  longitude: number;
  items: IItem[];
}
