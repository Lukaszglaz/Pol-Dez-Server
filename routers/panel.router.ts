import { Router } from "express";
import { client } from "../index";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";

export const panelRouter = Router().get(
  "/",
  authorizationMiddleware,

  async (req, res) => {
    const player = await client.getPlayer((res as any).user.playerTag);

    const clan = player.clan ? await client.getClan(player.clan.tag) : null;

    res.status(200).json({
      results: {
        player,
        clan,
      },
    });
  }
);
