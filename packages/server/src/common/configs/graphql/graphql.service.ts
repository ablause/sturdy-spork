import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { MemcachedCache } from 'apollo-server-cache-memcached';
import { PubSub } from 'graphql-subscriptions';
import * as path from 'path';

const pubSub = new PubSub();

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  // constructor(private readonly authService: AuthService) {}

  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      definitions: {
        path: path.join(process.cwd(), 'src/typings/gql.ts'),
        outputAs: 'class',
      },
      // directiveResolvers,
      context: async ({ req, res, connection }) => {
        if (connection) {
          return {
            req: connection.context,
            pubSub,
          };
        }

        return {
          req,
          res,
          pubSub,
        };
      },
      debug: false,
      subscriptions: {
        onConnect: () => {
          console.log('🔗 Connected to websocket');
        },
      },
      persistedQueries: {
        cache: new MemcachedCache(
          ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
          { retries: 10, retry: 10000 }, // Options
        ),
      },
      installSubscriptionHandlers: true,
      introspection: true,
      playground: {
        title: 'Sturdy-spork',
      },
    };
  }
}
