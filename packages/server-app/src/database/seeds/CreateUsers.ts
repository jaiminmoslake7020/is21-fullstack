import { Factory, Seeder, times } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../models/User';
import users from './../users.json';

export default class CreateUsers implements Seeder {

    // @ts-ignore
    public async run(factory: Factory, connection:Connection): Promise<void> {

        const em = connection.createEntityManager();
        await times(5, async (n) => {
            const x = users[n];
            const user = new User();
            user.username = x.username;
            user.name =  x.name;
            user.role = x.role as any;
            user.permissions = JSON.stringify(x.permissions) as any;
            user.userStatus = x.userStatus as any;
            await em.save(user);
            return user;
        });
    }

}
