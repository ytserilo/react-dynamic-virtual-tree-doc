import React from "react";
import { Highlight } from "../../../components/highlight";

export const QueueObj = () => {
  return (
    <div>
      <h2 id="queueObj" className="layoutTitle">
        queueObj
      </h2>
      <blockquote>
        <p>
          Additional functionality that you need only if you care about the
          correct order of component updates.
        </p>
      </blockquote>
      <h3>Methods</h3>
      <h4>pushTask</h4>
      <pre lang="no-highlight">
        <code>pushTask: </code>
        <code>
          <Highlight
            minimum={true}
            language="typescript"
            code={`(
  taskId: string,
  task: () => Promise<void>,
  priority: number = 0
) => Promise<void>`}
          />
        </code>
      </pre>
      <p>
        It's important to pay attention to the <strong>priority</strong>{" "}
        argument, as it determines the execution order of tasks. You can even
        set a priority of -1, but it's not recommended.
      </p>
      <p>
        Tasks are executed from higher to lower priority, so if one task has a
        priority of 4 and another has 2, the task with priority 4 will be
        executed first. (This applies when both tasks are queued for execution
        and have not been invoked yet).
      </p>
      <p>
        Here's an example of how to use <strong>queueObj.pushTask</strong>:
      </p>
      <Highlight
        language="typescript"
        code={`queueObj
 .pushTask(
   "id",
   () => {
     // do something
   },
   0 // priority
 )
 .catch((err: RejectInterface) => {
   /*
 RejectInterface -> {pushAnyway: () => Promise<void>}
  */
   /*
   The catch block is invoked only if a task with the same id is already in the queue.
   But in any case, you can call the pushAnyway function,
   and your task will still be added to the queue.
  */
   /*
 You can choose not to use catch, in which case a task with the same id won't be added to the queue.
  */
   err.pushAnyway().finally(() => {
     // Task done
   });
 })
 .finally(() => {
   /*
 Task done
  */
 });`}
      />
    </div>
  );
};
