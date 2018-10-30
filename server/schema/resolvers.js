module.exports = {
  makeResolvers(db) {
    return {
      Query: {
        pledges() {
          return db.query('select * from pledges')
        },
      },
      Mutation: {
        addPledge(_, args) {
          return db
            .query(
              `insert into pledges (email) values (\${email}) returning *`,
              {
                email: args.email,
              }
            )
            .then(newPledges => newPledges[0])
        },
      },
    }
  },
}
