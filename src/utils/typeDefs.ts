import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLOutputType,
  GraphQLScalarType,
  Kind,
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

export const GraphQLUpload = new GraphQLScalarType({
  name: "Upload",
  description: "A file upload scalar",
  parseValue(value) {
    return value; // Return the file stream
  },
  parseLiteral() {
    throw new Error("Upload scalar literal not supported");
  },
  serialize() {
    throw new Error("Upload scalar serialization not supported");
  },
});
 

export const GraphQLTime = new GraphQLScalarType({
  name: 'Time',
  description: 'Time custom scalar, formatted as HH:mm',

  parseValue(value) {
    const parsed = moment(value as MomentInput, 'HH:mm', true);
    if (!parsed.isValid()) throw new TypeError(`Invalid time format, expected HH:mm: ${value}`);
    return parsed.format('HH:mm');
  },

  serialize(value) {
    return moment(value as MomentInput).format('HH:mm');
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const parsed = moment(ast.value, "HH:mm", true);
      if (!parsed.isValid())
        throw new TypeError(
          `Invalid time format, expected HH:mm: ${ast.value}`
        );
      return parsed.format("HH:mm");
    }
    throw new TypeError(`Time must be a string in HH:mm format`);
  }
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

 