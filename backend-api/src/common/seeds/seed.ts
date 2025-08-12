import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { DATABASE_URL } from '../constant/app.constant';
import { RoleDocument, RoleSchema } from 'src/modules/role/schema/role.schema';
import { PermissionDocument, PermissionSchema } from 'src/modules/permissions/schema/permission.schema';
import { RolePermissionDocument, RolePermissionSchema } from 'src/modules/role-permissions/schema/role-permission.schema';
import { UserDocument, UserSchema } from 'src/modules/user/schema/user.schema';
import { hashSync } from 'bcrypt';

dotenv.config();

async function seed() {
    await mongoose.connect(DATABASE_URL);

    const RoleModel =
        (mongoose.models.Role as mongoose.Model<RoleDocument>) ||
        mongoose.model<RoleDocument>('Role', RoleSchema as mongoose.Schema<RoleDocument>);

    const PermissionModel =
        (mongoose.models.Permission as mongoose.Model<PermissionDocument>) ||
        mongoose.model<PermissionDocument>('Permission', PermissionSchema as mongoose.Schema<PermissionDocument>);

    const RolePermissionModel =
        (mongoose.models.RolePermission as mongoose.Model<RolePermissionDocument>) ||
        mongoose.model<RolePermissionDocument>('RolePermission', RolePermissionSchema as mongoose.Schema<RolePermissionDocument>);

    const UserModel =
        (mongoose.models.User as mongoose.Model<UserDocument>) ||
        mongoose.model<UserDocument>('User', UserSchema as mongoose.Schema<UserDocument>);

    console.log('🌱 Seeding start...');

    // Xóa dữ liệu cũ
    await RoleModel.deleteMany({});
    await PermissionModel.deleteMany({});
    await RolePermissionModel.deleteMany({});
    await UserModel.deleteMany({});

    const roles = await RoleModel.insertMany([
        { name: 'Admin', description: 'Quản Trị Viên Hệ Thống', isActive: true, isDeleted: false },
        { name: 'Customer', description: 'Khách Hàng', isActive: true, isDeleted: false },
    ]);
    console.log('Roles created:', roles.map(r => ({ _id: r._id, name: r.name })));

    const permissions = await PermissionModel.insertMany([
        { key: 'VIEW_USERS', name: 'View Users', endpoint: '/api/users', method: 'GET', module: 'Users', isDeleted: false },
        { key: 'CREATE_USER', name: 'Create User', endpoint: '/api/users', method: 'POST', module: 'Users', isDeleted: false },
        { key: 'VIEW_ORDERS', name: 'View Orders', endpoint: '/api/orders', method: 'GET', module: 'Orders', isDeleted: false },
        { key: 'CREATE_ORDER', name: 'Create Order', endpoint: '/api/orders', method: 'POST', module: 'Orders', isDeleted: false },
    ]);
    console.log('Permissions created:', permissions.map(p => ({ _id: p._id, key: p.key })));

    const rolePermsPayload = [
        { roleId: roles[0]._id, permissionId: permissions[0]._id, isActive: true, isDeleted: false }, // Admin - VIEW_USERS
        { roleId: roles[0]._id, permissionId: permissions[1]._id, isActive: true, isDeleted: false }, // Admin - CREATE_USER
        { roleId: roles[0]._id, permissionId: permissions[2]._id, isActive: true, isDeleted: false }, // Admin - VIEW_ORDERS
        { roleId: roles[0]._id, permissionId: permissions[3]._id, isActive: true, isDeleted: false }, // Admin - CREATE_ORDER
        { roleId: roles[1]._id, permissionId: permissions[2]._id, isActive: true, isDeleted: false }, // Customer - VIEW_ORDERS
        { roleId: roles[1]._id, permissionId: permissions[3]._id, isActive: true, isDeleted: false }, // Customer - CREATE_ORDER
    ];
    await RolePermissionModel.insertMany(rolePermsPayload);
    console.log('RolePermissions created:', rolePermsPayload.map(rp => ({ roleId: rp.roleId, permissionId: rp.permissionId })));

    const adminUser = await UserModel.create({
        fullName: 'Admin',
        email: 'admin@shop.com',
        password: hashSync('admin123.*@', 10),
        phoneNumber: '0123456789',
        avatar: null,
        address: 'TPHCM, Việt Nam',
        gender: 'male',
        roleId: roles[0]._id, 
        isDeleted: false,
    });
    console.log('Admin user created:', { email: adminUser.email, roleId: adminUser.roleId });

    console.log('✅ Seeding finished.');
    await mongoose.disconnect();
}

seed().catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
});