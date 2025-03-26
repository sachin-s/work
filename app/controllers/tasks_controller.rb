class TasksController < ApplicationController
  before_action :set_task, only: %i[ show edit destroy archive ]
  before_action :set_update_task, only: %i[ update ]
  include Pagy::Backend


  # GET /tasks or /tasks.json
  def index
      @pagy, @tasks = pagy(allTasksFilter())
      @tasks_map = @tasks.select(:task_id, :title, :status, :priority, :created_at).index_by(&:task_id)
      @tasks_map.each do |key,task|
        task.created_at = task.created_at.strftime('%d-%b-%Y %I:%M %p')
        task.status = capitalize_and_replace_underscores(task.status)
        task.priority = capitalize_and_replace_underscores(task.priority)
      end
  end

  def archive
    @task.archiveTask

    respond_to do |format|
      format.html { redirect_to tasks_path, status: :see_other, notice: "Task was successfully archived." }
      format.json { head :no_content }
    end    
  end

  def allTasksFilter
    @tasks = Task.all.order(
      Arel.sql("CASE WHEN priority = 'High' THEN 1
                      WHEN priority = 'Medium' THEN 2
                      WHEN priority = 'Low' THEN 3
                      ELSE 4 END")
    )
    .order(created_at: :desc)
    @tasks
  end

  def export_tasks
    @tasks = allTasksFilter()
    @tasks_map = @tasks.select(:task_id, :title, :status, :priority, :created_at).index_by(&:task_id)

    response.headers['Content-Type'] = 'text/csv; charset=utf-8'
    response.headers['Content-Disposition'] = "attachment; filename=tasks_export.csv"

    csv_string = CSV.generate do |csv|
      csv << ["Task ID", "Title", "Status", "Priority", "Created At"]  # Header row
      @tasks.each do |task|
        csv << [task.task_id, task.title, task.status, task.priority, task.created_at]
      end
    end
  
    # Send the generated CSV data as a file download
    render plain: csv_string

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
    @notice = params[:notice]
  end

  # POST /tasks or /tasks.json
  def create
    @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        format.html { redirect_to edit_task_path(task_id: @task.task_id), notice: "Task was successfully created." }
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
      #binding.pry
      task_id = params[:task][:task_id].nil? ? params[:task_id] : params[:task][:task_id]
      @task = Task.find_by!(task_id: task_id)
    end

    def capitalize_and_replace_underscores(str)
      str.tr('_', ' ').capitalize
    end
    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:task_id, :title, :status, :priority)
    end
end