'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    first_name: { type: 'string', length: 50 },
    last_name: { type: 'string', length: 50 },
  })
    .then(() => db.createTable('groups', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      name: { type: 'string', length: 50 },
    }))
    .then(() => db.createTable('memberships', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      user_id: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'memberships_user_id_fk',
          table: 'users',
          rules: {
            onDelete: 'CASCADE',
          },
          mapping: 'id'
        },
      },
      group_id: {
        name: 'memberships_group_id_fk',
        type: 'int',
        notNull: true,
        foreignKey: {
          table: 'groups',
          rules: {
            onDelete: 'CASCADE',
          },
          mapping: 'id'
        },
      },
    }));
};

exports.down = function(db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
