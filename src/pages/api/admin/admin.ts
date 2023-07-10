import clientPromise from '../../../lib/mongodb';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface AdminProps {
  name: string;
  email: string;
  image: string;
}

export interface ResultProps {
  _id: string;
  riders: RiderProps[];
}

export interface RiderProps {
  name: string;
  username: string;
  contact: number;
  email: string;
  image: string;
  bio: string;
  rating: number;
  bioMdx: MDXRemoteSerializeResult<Record<string, unknown>>;
  verified: boolean;
}

export async function getMdxSource(postContents: string) {
  // Use remark plugins to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkMdx)
    .process(postContents);

  // Convert converted html to string format
  const contentHtml = String(processedContent);

  // Serialize the content string into MDX
  const mdxSource = await serialize(contentHtml);
  return mdxSource;
}

export const placeholderBio = `My name is Gi Codes and I am testing this software product`;

// get rider with username in Props
export async function getRider(username: string): Promise<RiderProps | null> {
  const client = await clientPromise;
  const collection = client.db("tsaron.gps").collection("users");
  const results = await collection.findOne(
    { username },
    { projection: { _id: 0, emailVerified: 0 } }
  );
  if (results) {
    return {
      ...results,
    }
  } else {
    return null;
  }
}

// get index rider from collection users
export async function getFirstRider(): Promise<RiderProps | null> {
  const client = await clientPromise;
  const collection = client.db("tsaron.gps").collection("users");
  const results = await collection.findOne(
    {},
    {
      projection: { _id: 0, emailVerified: 0 }
    }
  );
  return {...results};
}

export async function getAllRiders(): Promise<ResultProps[]> {
  const client = await clientPromise;
  const collection = client.db("tsaron.gps").collection("users");
  return await collection
    .aggregate([
      { //sort by rider rating
        $sort: {
          rating: -1
        }
      },
      { // sort alphabetically
        $sort: {
          _id: 1
        }
      }
    ])
    .toArray();
}

export async function searchRider(query: string): Promise<RiderProps[]> {
  const client = await clientPromise;
  const collection = client.db("tsaron.gps").collection("users");
  return await collection
    .aggregate([
      {
        $search: {
          index: 'name-index',
          /* 
          { // name-index is a search index as follows:
            "mappings": {
              "fields": {
                "rating": {
                  type: "number",
                }
                "name": {
                  "analyzer": "lucene.whitespace",
                  "searchAnalyzer": "lucene.whitespace",
                  "type": "string"
                },
                "username": {
                  "type": "string"
                }
              }
            }
          }
          */
          text: { 
            query: query,
            path:
            { // match on both name and username
              wildcard: '*' 
            },
            fuzzy: {},
            score: 
              { // search ranking algorithm: multiply relevance score by the log1p of rider rating
              function: {
                multiply: [
                  {
                    score: 'relevance'
                  },
                  {
                    log1p: {
                      path: {
                        value: 'ratings'
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      { // filter out riders that are not verified
        $match: {
          verified: true
        }
      },   
      { // limit to 10 results
        $limit: 10
      },
      {
        $project: {
          _id: 0,
          emailVerified: 0,
          score: {
            $meta: 'searchScore'
          }
        }
      }
    ])
    .toArray();
}

export async function getRiderCount(): Promise<number> {
  const client = await clientPromise;
  const collection = client.db("tsaron.gps").collection("users");
  return await collection.countDocuments();
}

export async function updateRider(username: string, bio: string) {
  const client = await clientPromise;
  const collection = client.db("tsaron.gps").collection("users");
  return await collection.updateOne({ username }, { $set: { bio } });
}