import { BaseRepository } from "./BaseRepository";
import Recipe from "../models/Recipe";
import Ingredient from "../models/Ingredient";
import Step from "../models/Step";
import Unit from "../models/Unit";
import Category from "../models/Category";
import Opinion from "../models/Opinion";
import User from "../models/User";
import { Op } from "sequelize";

export class RecipeRepository extends BaseRepository<Recipe> {
  constructor() {
    super(Recipe);
  }

  async findByUser(userId: number | string): Promise<Recipe[]> {
    return this.model.findAll({
        where: { userId },
        include: [
          {
            model: Ingredient,
            include: [
              {
                model: Unit,
              },
            ],
          },
          {
            model: Step,
          },
          {
            model: Category,
          },
          {
            model: Opinion,
          }
        ],
    });
  }

  async findById(id: number | string): Promise<Recipe> {
    return this.model.findByPk(id, {
      include: [
        {
          model: Ingredient,
          include: [
            {
              model: Unit,
            },
          ],
        },
        {
          model: Step,
        },
        {
          model: Category,
        },
        {
          model: Opinion,
          include: [
            {
              model: User
            }
          ]
        }
      ],
    });
  }

  async findAll(): Promise<Recipe[]> {
    return this.model.findAll({
      include: [
        {
          model: Ingredient,
          include: [
            {
              model: Unit,
            },
          ],
        },
        {
          model: Step,
        },
        {
          model: Category,
        },
        {
          model: Opinion,
          include: [
            {
              model: User
            }
          ]
        }
      ],
    });
  }

  async findNewest(): Promise<Recipe[]> {
    return this.model.findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      limit: 20,
      include: [
        {
          model: Ingredient,
          include: [
            {
              model: Unit,
            },
          ],
        },
        {
          model: Step,
        },
        {
          model: Category,
        },
        {
          model: Opinion,
          include: [
            {
              model: User
            }
          ]
        }
      ],
    })
  }

  async findInspirations(ingredients: string[]): Promise<Recipe[]> {
    return this.model.findAll({
      include: [
        {
          model: Ingredient,
          where: {
            name: {
              [Op.in]: ingredients,
            },
          },
        },
      ]
    });
  }
}