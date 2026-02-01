import type {User} from 'hybrid-types/DBTypes';

type Credentials = Pick<User, 'username' | 'password'>;

export type{Credentials};