import { PageElement, Value } from "@serenity-js/web";
import { byLabel, byPlaceholder } from "./fa-playwright-helpers";

export const field1 = () => PageElement.located(byLabel("Label1")).describedAs(`field 1`);
export const field2 = () => PageElement.located(byLabel("Label2")).describedAs(`field 2`);
export const op1 = () => PageElement.located(byPlaceholder("Operand 1")).describedAs(`operand 1`);
export const op2 = () => PageElement.located(byPlaceholder("Operand 2")).describedAs(`operand 2`);
export const opResult = () => PageElement.located(byPlaceholder("Result")).describedAs(`result`);

export const field1Value = () => Value.of(field1()).describedAs("field 1 value");
export const field2Value = () => Value.of(field2()).describedAs("field 2 value");
export const op1Value = () => Value.of(op1()).describedAs("operand 1 value");
export const op2Value = () => Value.of(op2()).describedAs("operand 2 value");
export const calculationResult = () => Value.of(opResult()).describedAs("result value");
