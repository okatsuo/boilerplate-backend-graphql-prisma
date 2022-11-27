import { ProfileController } from '../../modules/accounts/useCases/profile/profileController'

export const makeProfileController = (): ProfileController => {
  return new ProfileController()
}
