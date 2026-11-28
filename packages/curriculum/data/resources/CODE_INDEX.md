# Code examples

Offline examples are designed for local execution. Optional/external/server examples are illustrative integration starters, not verified deployments.

| Module | File                                                                         | Mode     | Dependencies                  |
| ------ | ---------------------------------------------------------------------------- | -------- | ----------------------------- |
| F01    | [python_data](code/F01/python_data.py)                                       | offline  | numpy, pandas                 |
| F02    | [math_basics](code/F02/math_basics.py)                                       | offline  | numpy                         |
| M01    | [preprocessing_pipeline](code/M01/preprocessing_pipeline.py)                 | offline  | numpy, scikit-learn           |
| M02    | [supervised_baselines](code/M02/supervised_baselines.py)                     | offline  | scikit-learn                  |
| M03    | [cross_validation](code/M03/cross_validation.py)                             | offline  | scikit-learn                  |
| M04    | [clustering](code/M04/clustering.py)                                         | offline  | scikit-learn                  |
| M05    | [forecast_backtest](code/M05/forecast_backtest.py)                           | offline  | numpy                         |
| D01    | [autograd_mlp](code/D01/autograd_mlp.py)                                     | offline  | torch                         |
| D02    | [train_eval](code/D02/train_eval.py)                                         | offline  | torch                         |
| D03    | [causal_attention](code/D03/causal_attention.py)                             | offline  | torch                         |
| D04    | [diffusion_noising](code/D04/diffusion_noising.py)                           | offline  | torch                         |
| C01    | [image_processing](code/C01/image_processing.py)                             | offline  | numpy, opencv-python-headless |
| C02    | [cnn_shapes](code/C02/cnn_shapes.py)                                         | offline  | torch                         |
| C03    | [iou_dice](code/C03/iou_dice.py)                                             | offline  | numpy                         |
| C04    | [video_motion](code/C04/video_motion.py)                                     | offline  | numpy, opencv-python-headless |
| G01    | [tokenizer_templates](code/G01/tokenizer_templates.py)                       | external | transformers                  |
| G02    | [structured_output](code/G02/structured_output.py)                           | offline  | pydantic>=2                   |
| G03    | [rag_retrieval](code/G03/rag_retrieval.py)                                   | offline  | numpy, scikit-learn           |
| G04    | [bounded_corrective_rag](code/G04/bounded_corrective_rag.py)                 | offline  | stdlib                        |
| G05    | [tool_agent_loop](code/G05/tool_agent_loop.py)                               | offline  | stdlib                        |
| G06    | [langgraph_sequence](code/G06/langgraph_sequence.py)                         | optional | langgraph                     |
| G06    | [langgraph_parallel_conditional](code/G06/langgraph_parallel_conditional.py) | optional | langgraph                     |
| G06    | [langgraph_hitl](code/G06/langgraph_hitl.py)                                 | optional | langgraph                     |
| G07    | [fastmcp_server](code/G07/fastmcp_server.py)                                 | server   | fastmcp                       |
| G07    | [fastmcp_client](code/G07/fastmcp_client.py)                                 | optional | fastmcp                       |
| G08    | [scoped_memory](code/G08/scoped_memory.py)                                   | offline  | stdlib                        |
| G08    | [mem0_adapter](code/G08/mem0_adapter.py)                                     | external | mem0ai                        |
| G09    | [fastapi_sse](code/G09/fastapi_sse.py)                                       | server   | fastapi, uvicorn, pydantic>=2 |
| G09    | [litellm_completion](code/G09/litellm_completion.py)                         | external | litellm                       |
| G10    | [offline_eval](code/G10/offline_eval.py)                                     | offline  | stdlib                        |
| G10    | [deepeval_example](code/G10/deepeval_example.py)                             | external | deepeval                      |
| G10    | [ragas_example](code/G10/ragas_example.py)                                   | optional | ragas                         |
| G11    | [lora_parameter_count](code/G11/lora_parameter_count.py)                     | offline  | torch                         |
| G11    | [peft_lora](code/G11/peft_lora.py)                                           | external | transformers, peft, torch     |
| P01    | [model_artifact](code/P01/model_artifact.py)                                 | offline  | scikit-learn, joblib          |
| P02    | [drift_monitoring](code/P02/drift_monitoring.py)                             | offline  | numpy                         |
