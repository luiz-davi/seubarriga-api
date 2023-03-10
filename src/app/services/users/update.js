const User = require("../../models/User");

class UpdateService {

  async call(body, user_id){
    const user = await User.findByPk(user_id);

    if(! await user.check_autorization(body.old_password)){
      return {
        success: false,
        status: 401,
        result: {},
        error: [{ message: "Confirmação da senha atual falhou." }]
      };
    }

    try {
      const updated_user = await user.update(body);

      return {
        success: true,
        status: 200,
        result: {
          message: "Cadastro do usuário atualizado com sucesso.",
          user: {
            id: updated_user.id,
            name: updated_user.full_name,
            email: updated_user.email
          }
        },
        error: {}
      };

    } catch (error) {
      return {
        success: false,
        status: 400,
        result: {},
        error: error.errors
      };
    }

  }

}

module.exports = new UpdateService();
