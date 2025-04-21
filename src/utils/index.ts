import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLUnionType,
} from "graphql";
import _ from "lodash";

interface FormattedResponse {
  status: number;
  success: boolean;
  isToast: boolean;
  message: string;
  data: any;
}

export const formatResponse = (params: {
  message: string;
  data?: any;
  status?: number;
  isToast?: boolean;
}): FormattedResponse => {
  return {
    status: params.status ?? 200,
    success: true,
    isToast: params.isToast ?? true,
    message: params.message,
    data: params.data ?? null,
  };
};

interface GetArgumentsConfig<T> {
  outputType: GraphQLObjectType;
  exclude?: (keyof T)[];
  nullables?: Array<keyof T>;
  includes?: (keyof T)[];
  typeOverrides?: Record<string, { type: GraphQLInputType }>;
}

interface Argument {
  type: GraphQLInputType;
}

export const getArguments = <T>(
  config: GetArgumentsConfig<T>
): { [key: string]: Argument } => {
  const {
    outputType,
    exclude = [],
    includes = [],
    nullables = [],
    typeOverrides = {},
  } = config;

  const outputFields = outputType.getFields();
  const args: { [key: string]: Argument } = {};

  Object.entries(outputFields).forEach(([fieldName, field]) => {
    if (
      (_.size(
        exclude.concat([
          "created_at",
          "updated_at",
          "deleted_at",
          "created_by",
          "updated_by",
          "deleted_by",
        ] as unknown as keyof T)
      ) > 0 &&
        exclude.includes(fieldName as keyof T)) ||
      (_.size(includes) > 0 && !includes.includes(fieldName as keyof T))
    ) {
      return;
    }

    if (
      (typeOverrides as Record<string, { type: GraphQLInputType }>)[fieldName]
    ) {
      args[fieldName] = typeOverrides[fieldName];
      return;
    }

    let baseType: GraphQLOutputType = field.type;
    let isNonNull = false;

    if (baseType instanceof GraphQLNonNull) {
      isNonNull = true;
      baseType = baseType.ofType;
    }

    let isList = false;
    if (baseType instanceof GraphQLList) {
      isList = true;
      baseType = baseType.ofType;
    }

    if (
      baseType instanceof GraphQLObjectType ||
      baseType instanceof GraphQLInterfaceType ||
      baseType instanceof GraphQLUnionType
    ) {
      baseType = GraphQLID;
    }

    let finalType: GraphQLInputType = baseType as GraphQLInputType;
    if (isList) {
      finalType = new GraphQLList(finalType);
    }
    if (
      isNonNull &&
      !nullables.includes((fieldName as keyof T) || ("all" as keyof T))
    ) {
      finalType = new GraphQLNonNull(finalType);
    }

    args[fieldName] = { type: finalType };
  });

  return args;
};
