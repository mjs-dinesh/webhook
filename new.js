const desc = 'This is new file'
import { Octokit, App } from "octokit";
import { createAppAuth } from "@octokit/auth-app";
import { Request, Response, NextFunction } from 'express'
import dotenv from "dotenv";
dotenv.config();

const octokitController = {
  getoctokit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const appOctokit = new Octokit({
        authStrategy: createAppAuth,
        auth: {
          appId: process.env.GITHUB_APP_ID,
          privateKey: process.env.PRIVATE_KEY,
          // optional: this will make appOctokit authenticate as app (JWT)
          //           or installation (access token), depending on the request URL
          installationId: 123,
        },
      });
      const { data } = await appOctokit.request("/app");

      appOctokit.rest.pulls.get({
        owner: 'mjs-dinesh',
        repo: 'webhook',
        pull_number: 1,
      }).then((res: any) => console.log(res)).catch((err: any) => console.log(err));
    } catch (err) {
      err.description = "Something Wrong";
      next(err);
    }
  }
};

export default octokitController;
