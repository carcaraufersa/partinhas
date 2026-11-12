// Limites do nome (medidos depois do trim), usados no cadastro e na edição do perfil.
// O backend ainda não impõe limite: o DTO deve usar os mesmos valores (@Length(2, 60)).
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 60;
