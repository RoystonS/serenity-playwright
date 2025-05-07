import { Answerable, Task, the } from "@serenity-js/core";
import { field1, op1, op2 } from "./questions";
import { Enter } from "@serenity-js/web";

export const enterField1 = (value: Answerable<string>): Task =>
  Task.where(
    the`#actor enters ${value} into field 1`,
    Enter.theValue(value).into(field1())
    //Press.the(Key.Enter).in(field1()),
    //Wait.until(field1Value(), equals(value))
  );

export const driveCalculator = (value1: Answerable<number>, value2: Answerable<number>): Task =>
  Task.where(the`#actor drives calculator`, Enter.theValue(value1).into(op1()), Enter.theValue(value2).into(op2()));
