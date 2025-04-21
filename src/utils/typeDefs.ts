import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLOutputType,
  GraphQLScalarType,
} from "graphql";
import moment, { MomentInput } from "moment";

export const GraphQLDate = new GraphQLScalarType({
  name: "Date",
  parseValue(value) {
    return moment(value as MomentInput).toDate();
  },
  serialize(value) {
    return moment(value as MomentInput).toDate();
  },
});

export const formatResponseType = (
  name: string,
  dataType?: GraphQLOutputType | null,
  rest?: Record<string, { type: GraphQLScalarType<any, any> }>
) => {
  return new GraphQLObjectType({
    name: `${name}Response`,
    fields: () => ({
      status: { type: GraphQLInt },
      success: { type: GraphQLBoolean },
      isToast: { type: GraphQLBoolean },
      isError: { type: GraphQLBoolean },
      message: { type: GraphQLString },
      ...rest,
      ...(dataType
        ? {
            data: {
              type: dataType,
              description: `The ${name.toLowerCase()} data`,
            },
          }
        : {}),
    }),
  });
};

 