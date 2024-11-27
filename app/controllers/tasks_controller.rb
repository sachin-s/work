class TasksController < ApplicationController
  before_action :set_task, only: %i[ show edit destroy ]
  before_action :set_update_task, only: %i[ update ]

  # GET /tasks or /tasks.json
  def index
    @tasks = Task.all.order(
      Arel.sql("CASE WHEN priority = 'High' THEN 1
                      WHEN priority = 'Medium' THEN 2
                      WHEN priority = 'Low' THEN 3
                      ELSE 4 END")
    )
    .order(created_at: :desc)
    @tasks_map = @tasks.select(:task_id, :title, :status, :priority, :created_at).index_by(&:task_id)
    @tasks_map.each do |key,task|
      task.created_at = task.created_at.strftime('%d-%b-%Y %I:%M %p')
    end
    # Converts to a hash
  end

  # GET /tasks/1 or /tasks/1.json
  def show
  end

  # GET /tasks/new
  def new
    @task = Task.new
    @task.send(:generate_task_id) 
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks or /tasks.json
  def create
    @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        format.html { redirect_to task_path(task_id: @task.task_id), notice: "Task was successfully created." }
        format.json { render :show, status: :created, location: @task }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1 or /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to task_path(task_id: @task.task_id), notice: "Task was successfully updated." }
        format.json { render :show, status: :ok, location: @task }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1 or /tasks/1.json
  def destroy
    @task.destroy!

    respond_to do |format|
      format.html { redirect_to tasks_path, status: :see_other, notice: "Task was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find_by!(task_id: params[:task_id])
    end

    def set_update_task
      @task = Task.find_by!(task_id: params[:task][:task_id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:task_id, :title, :status, :priority)
    end
end
