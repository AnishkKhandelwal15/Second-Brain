import { z } from "zod";
import {Types} from "../enums/types.enums";
import {isValidObjectId} from "mongoose";

export const ContentSchema = z.object({

    title : z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(128, "Title must be no longer than 128 characters"),

    content :z.
    string()
    .min(3, "Content must be at least 3 characters long")
    .max(1024, "Content must be no longer than 1024 characters"),

    types : z
    .nativeEnum(Types)
    .refine(
       (value) => Object.values(Types).includes(value as Types),{
       message: `Invalid type provided. Valid types are: ${Object.values(Types).join(", ")}`,
    }),

    link : z
    .string()
    .optional()
    .refine(
      (val) => !val || val.startsWith("http") || val.startsWith("https"),
      "Link must be a valid URL"
    )
    .transform((val) => (val?.trim() === "" ? undefined : val)),

    tags: z
    .array(
      z.string()
        .trim()
        .max(20, "Each tag must be at most 20 characters")
    )
    .optional(),

});

export const deleteContentSchema = z.object({
    contentId : z
        .string()
        .refine(
            id => isValidObjectId(id),
            {
                message : "ContentId is not valid"
            }
        )
});