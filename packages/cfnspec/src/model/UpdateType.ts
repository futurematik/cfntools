import { is } from '@fmtk/validation';
import { stringEnum } from '../util/StringEnum';

export const UpdateType = stringEnum('Mutable', 'Immutable', 'Conditional');

export type UpdateType = keyof typeof UpdateType;

export const validateUpdateType = is<UpdateType>(...Object.values(UpdateType));
