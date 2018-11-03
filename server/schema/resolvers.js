const yup = require('yup')

const addPledgeSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
})

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
          return addPledgeSchema.validate(args).then(() => {
            return db
              .query(
                `insert into pledges (email) values (\${email}) returning *`,
                {
                  email: args.email,
                }
              )
              .then(newPledges => newPledges[0])
          })
        },
      },
    }
  },
}
