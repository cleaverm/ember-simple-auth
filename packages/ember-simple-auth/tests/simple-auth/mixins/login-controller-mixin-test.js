import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';
import Session from 'simple-auth/session';
import EphemeralStore from 'simple-auth/stores/ephemeral';

describe('LoginControllerMixin', function() {
  beforeEach(function() {
    this.session    = Session.create({ store: EphemeralStore.create() });
    this.controller = Ember.Controller.extend(LoginControllerMixin).create({
      authenticator: 'authenticator',
      session:       this.session
    });
  });

  describe('the "authenticate" action', function() {
    describe('when both identification and password are set on the controller', function() {
      beforeEach(function() {
        sinon.stub(this.session, 'authenticate');
        this.controller.setProperties({
          identification: 'identification',
          password:       'password'
        });
      });

      it('unsets the password', function() {
        this.controller._actions.authenticate.apply(this.controller);

        expect(this.controller.get('password')).to.be.null;
      });

      it('authenticates the session', function() {
        this.controller._actions.authenticate.apply(this.controller);

        expect(this.session.authenticate).to.have.been.calledWith(
          'authenticator',
          { identification: 'identification', password: 'password'
        });
      });
    });

  });
});
