import type { task_groups } from "@prisma/client";

class TaskGroupDto {
    public task_group_id: string;
    public name: string;
    public icon: string | null;
    public background_url: string | null;

    constructor(model: task_groups) { 
        this.task_group_id = model.task_group_id;
        this.name = model.name;
        this.icon = model.icon;
        this.background_url = model.background_url;
    };
};

export default TaskGroupDto;